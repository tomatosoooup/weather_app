interface ButtonProps {
    isPending?: boolean
    type?: "submit" | 'button'
    children?: React.ReactNode
}


export const Button = ({children, isPending, type="button"}: ButtonProps)=> {
    return <button disabled={isPending} type={type}>{children}</button>
}