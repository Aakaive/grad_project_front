// src/utils/logout.ts
export const logout = async () => {
    // API를 통해 로그아웃 요청 (HTTP 메서드 수정)
    const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST', // POST로 수정
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('Response status:', response.status); // 상태 코드 확인
    console.log('Response body:', await response.text()); // 응답 본문 확인

    if (response.ok) {
        console.log('Logged out successfully');

        window.location.reload(); // 페이지 리로드
    } else {
        console.error('Failed to log out');
    }
};
