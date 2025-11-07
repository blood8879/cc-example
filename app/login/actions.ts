'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error)

    // 이메일 인증이 필요한 경우
    if (error.message.includes('Email not confirmed')) {
      redirect('/login?message=' + encodeURIComponent('이메일 인증이 필요합니다. 이메일을 확인해주세요.'))
    }

    redirect('/login?message=' + encodeURIComponent(`로그인 실패: ${error.message}`))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/register?message=' + encodeURIComponent('회원가입에 실패했습니다. 다시 시도해주세요.'))
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=' + encodeURIComponent('회원가입이 완료되었습니다. 이메일을 확인해주세요.'))
}

export async function signout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/?message=' + encodeURIComponent('로그아웃에 실패했습니다.'))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
