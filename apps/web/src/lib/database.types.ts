export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'carer' | 'family' | 'patient'
          full_name: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact: Json | null
          medical_conditions: string[] | null
          primary_carer_id: string | null
        }
        Insert: {
          id: string
          email: string
          role: 'carer' | 'family' | 'patient'
          full_name?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: Json | null
          medical_conditions?: string[] | null
          primary_carer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'carer' | 'family' | 'patient'
          full_name?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: Json | null
          medical_conditions?: string[] | null
          primary_carer_id?: string | null
        }
      }
      patient_access: {
        Row: {
          id: string
          patient_id: string
          user_id: string
          access_level: 'read' | 'write'
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          user_id: string
          access_level: 'read' | 'write'
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          user_id?: string
          access_level?: 'read' | 'write'
          created_at?: string
        }
      }
      health_data: {
        Row: {
          id: string
          patient_id: string
          recorded_at: string
          steps: number
          heart_rate: number[]
          sleep_hours: number
          active_minutes: number
          distance: number
          device_type: string
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          recorded_at: string
          steps: number
          heart_rate: number[]
          sleep_hours: number
          active_minutes: number
          distance: number
          device_type: string
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          recorded_at?: string
          steps?: number
          heart_rate?: number[]
          sleep_hours?: number
          active_minutes?: number
          distance?: number
          device_type?: string
          created_at?: string
        }
      }
    }
  }
}