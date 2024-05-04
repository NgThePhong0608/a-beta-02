const Empty = ({ title, description }) => {
    return (
        <div className="bg-white mt-5 p-5 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <h1 className="font-bold text-2xl">{title}</h1>
            <div className="p-5">
                <p className="text-xl text-center items-center">{description}</p>
            </div>
        </div>
    )
}

export default Empty;