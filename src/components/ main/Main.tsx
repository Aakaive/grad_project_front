"use client";

import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import { Book } from '@/types/Book';

const Main: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            try {
                const res = await fetch('http://localhost:8080/api/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // accessToken 사용
                        'Content-Type': 'application/json'
                    }
                });

                if(!res.ok) {
                    throw new Error('네트워크 오류 발생');
                }

                const data: Book[] = await res.json();
                console.log('Fetched books:', data);
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchBooks();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (books.length === 0) {
        return <div>도서가 없습니다.</div>;
    }
    
    return (
        <div>
            <h1>도서 목록</h1>
            <ul>
                {books.map(book => (
                    <li key={book.bookId} className="flex gap-x-[5px]">
                        <div>제목 : {book.bookTitle}</div>
                        <div>/</div>
                        <div>장르 : {book.category}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;