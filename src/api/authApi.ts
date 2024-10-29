export async function authApi() {
  try {
    const response = await fetch('http://localhost:8080/auth/check', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Error Response:', response.status);
      return false; // 비정상 응답 처리
    }

    const jsonResponse = await response.json(); // JSON으로 응답 파싱
    console.log("API Response:", jsonResponse); // 응답 상태 출력

    // data 속성에서 "isLoggedIn" 여부 확인
    return jsonResponse.data === "isLoggedIn"; 
  } catch (error) {
    console.error('Network Error:', error);
    return false; // 네트워크 오류
  }
}
