import { Navigate } from 'react-router-dom';

export default function PublicRouter({ children }) {
    const token = localStorage.getItem('userToken');
    if (token) {
        return <Navigate to='/' />;
    }
    return children;
}
