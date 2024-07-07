import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import useLoggedInStore from '@/stores/logInOut-store';

const LogInOutButton = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLoggedIn, logIn, logOut } = useLoggedInStore();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            logIn();
        }
    }, [logIn]);


    const handleSignOut = () => {
        // 清除本地存儲中的用戶信息
        localStorage.removeItem('user');
        alert('您已登出');
        logOut();
    }

    return (
        <div>
            {isLoggedIn ? (
                <div style={{ display: "flex" }}>
                    <Button
                        key="info"
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        style={{ fontSize: '1rem' }}
                        href="/info"
                    >
                        我的資訊
                    </Button>
                    <Button
                        key="signout"
                        onClick={handleSignOut}
                        sx={{ my: 2, color: 'white' }}
                        style={{ fontSize: '1rem' }}
                        href="/"
                    >
                        登出
                    </Button>
                </div>
            ) : (
                <div style={{ display: "flex" }}>
                    <Button
                        key="signin"
                        sx={{ my: 2, color: 'white' }}
                        style={{ fontSize: '1rem' }}
                        href="/signin"
                    >
                        登入
                    </Button>
                    <Button
                        key="signup"
                        sx={{ my: 2, color: 'white' }}
                        style={{ fontSize: '1rem' }}
                        href="/signup"
                    >
                        註冊
                    </Button>
                </div>
            )}

        </div>
    );
};

export default LogInOutButton;
