import { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckSquare, Square } from 'lucide-react'

export default function ColumnVisibilityDropdown({ table }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
                Columns
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 z-20 mt-2 w-64 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200">
                    <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                        <label className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                            <input
                                type="checkbox"
                                checked={table.getIsAllColumnsVisible()}
                                onChange={table.getToggleAllColumnsVisibilityHandler()}
                                className="hidden"
                            />
                            {table.getIsAllColumnsVisible() ? (
                                <CheckSquare className="w-5 h-5 text-black" />
                            ) : (
                                <Square className="w-5 h-5 text-gray-500" />
                            )}
                            <span className="whitespace-nowrap">Toggle All</span>
                        </label>
                        <hr className="border-gray-200" />
                        {table.getAllLeafColumns().map((column) => (
                            <label
                                key={column.id}
                                className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 p-2 rounded cursor-pointer transition"
                            >
                                <input
                                    type="checkbox"
                                    checked={column.getIsVisible()}
                                    onChange={column.getToggleVisibilityHandler()}
                                    className="hidden"
                                />
                                {column.getIsVisible() ? (
                                    <CheckSquare className="w-5 h-5 text-black" />
                                ) : (
                                    <Square className="w-5 h-5 text-gray-500" />
                                )}
                                <span className="truncate">{column.id}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
