import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Create response and clear auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // Immediately expire
    })

    return response

  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    )
  }
}