// ===================================
// Billing Service — Supabase CRUD
// ===================================
import { supabase } from './supabase'

/** Get all billing records with optional filters */
export const getBillingRecords = async (filters = {}) => {
  let query = supabase.from('billing').select('*').order('id', { ascending: false })

  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  const { data, error } = await query
  if (error) throw error

  let results = data.map(mapBilling)

  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(b =>
      (b.patientName || '').toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q)
    )
  }
  return results
}

/** Create a billing record */
export const createBillingRecord = async (billingData) => {
  const { data, error } = await supabase.from('billing').insert([{
    patient_name: billingData.patientName,
    doctor: billingData.doctor,
    date: billingData.date || new Date().toISOString().split('T')[0],
    amount: Number(billingData.amount),
    status: billingData.status || 'Pending',
    method: billingData.method,
    description: billingData.description
  }]).select().single()
  if (error) throw error
  return mapBilling(data)
}

/** Update a billing record */
export const updateBillingRecord = async (id, updates) => {
  const dbUpdates = {}
  if (updates.patientName !== undefined) dbUpdates.patient_name = updates.patientName
  if (updates.doctor !== undefined) dbUpdates.doctor = updates.doctor
  if (updates.amount !== undefined) dbUpdates.amount = Number(updates.amount)
  if (updates.status !== undefined) dbUpdates.status = updates.status
  if (updates.method !== undefined) dbUpdates.method = updates.method
  if (updates.description !== undefined) dbUpdates.description = updates.description

  const { data, error } = await supabase.from('billing').update(dbUpdates).eq('id', id).select().single()
  if (error) throw error
  return mapBilling(data)
}

/** Delete a billing record */
export const deleteBillingRecord = async (id) => {
  const { error } = await supabase.from('billing').delete().eq('id', id)
  if (error) throw error
  return true
}

/** Get billing summary stats */
export const getBillingSummary = async () => {
  const { data, error } = await supabase.from('billing').select('amount, status')
  if (error) throw error

  const total = data.reduce((sum, b) => sum + Number(b.amount), 0)
  const paid = data.filter(b => b.status === 'Paid').reduce((sum, b) => sum + Number(b.amount), 0)
  const pending = data.filter(b => b.status === 'Pending').reduce((sum, b) => sum + Number(b.amount), 0)
  const overdue = data.filter(b => b.status === 'Overdue').reduce((sum, b) => sum + Number(b.amount), 0)
  return { total, paid, pending, overdue }
}

/** Map DB columns to frontend format */
function mapBilling(row) {
  return {
    id: row.id,
    patientName: row.patient_name,
    doctor: row.doctor,
    date: row.date,
    amount: Number(row.amount),
    status: row.status,
    method: row.method,
    description: row.description
  }
}