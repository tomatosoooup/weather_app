import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
        <header className='bg-white'>
            <ul className='container mx-auto flex py-5 justify-center gap-x-5'><Link to="/main" className='hover:underline hover:underline-offset-2'>Main</Link>
            <Link to="/list" className='hover:underline hover:underline-offset-2'>List</Link></ul>
        </header>
        <main className='container mx-auto p-10'><Outlet/></main></>
    )
}

export {Layout}