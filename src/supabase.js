import { createClient } from '@supabase/supabase-js'

// TODO: ハードコーディングを修正
const supabaseUrl = 'https://ahxwceeoayxdtemmnmlj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeHdjZWVvYXl4ZHRlbW1ubWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzE3MjQsImV4cCI6MjA1Mjc0NzcyNH0.A0EyQYtIpMdZMOUAT7eP0F9i5RmrZR5IkVI5f1Ulfk0';

export const supabase = createClient(supabaseUrl, supabaseKey);