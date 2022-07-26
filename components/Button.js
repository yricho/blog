export default function Button({ onClick, children, className = "" }) {
    return (
        <div
            className={`cursor-pointer border w-max h-max py-2 px-4 bg-blue-500 text-white font-medium text-2xl ${className}`}
            onClick={onClick}>
            {children}
        </div>
    )
}