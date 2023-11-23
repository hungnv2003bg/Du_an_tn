import axios from 'axios'
import qs from 'qs'


const OAuth2 = {
    google: {
        clientId: '892401258789-hrt75jq6hsv2pjcjlfo946ddqh4e72uu.apps.googleusercontent.com',
        clientSecret: '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',
        redirectUri: 'http://localhost:3000/login',
        scope: 'profile email',
    },
}

export function getGoogleAuthUrl() {
    const { clientId, redirectUri, scope } = OAuth2.google


    const params = {
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
        response_type: 'code',
    }

    const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')

    return `https://accounts.google.com/o/oauth2/auth?${query}`
}

// Hàm exchangeCodeForToken(code) nhận mã nhận được từ trang chuyển hướng của Google OAuth2 và trao đổi nó
// lấy access token bằng cách gửi yêu cầu POST đến https://oauth2.googleapis.com/token.
export async function exchangeCodeForToken(code) {
    const { clientId, redirectUri, clientSecret } = OAuth2.google

    const params = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    }

    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify(params), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return {
        token: response.data.access_token,
    }
}

// Hàm getUserInfo(accessToken) gửi yêu cầu GET đến 
// https://www.googleapis.com/oauth2/v2/userinfo với access token được truyền vào tiêu đề Authorization để lấy thông tin người dùng.
export async function getUserInfo(accessToken) {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    return { data: response.data }
}