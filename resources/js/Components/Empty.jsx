const Empty = ({ title }) => {
    return (
        <div className="bg-white mt-5 p-5 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <h1 className="font-bold">{title}</h1>
            <div className="p-5">
                <p className="text-xl text-center items-center">No records found</p>
            </div>
        </div>
    )
}

export default Empty;