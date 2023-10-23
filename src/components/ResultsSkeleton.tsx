export default function ResultsSkeleton() {
    return <ul className="text-[17px] [list-style:none] [border-style:dashed_solid_solid] [border-image:initial] z-[111] relative bg-[white] max-w-full box-border overflow-hidden -mt-2.5 mb-0 mx-0 p-0 rounded-br-[10px] rounded-bl-[10px] border-[3px] border-[black]">
        <li className="w-full box-border bg-[white] text-[black] p-4 cursor-pointer">
            <div className="h-4 bg-gray-200 rounded-full w-100 animate-pulse" />
        </li>
        <li className="w-full box-border bg-[white] text-[black] p-4 cursor-pointer">
            <div className="h-4 bg-gray-200 rounded-full w-100 animate-pulse" />
        </li>
        <li className="w-full box-border bg-[white] text-[black] p-4 cursor-pointer">
            <div className="h-4 bg-gray-200 rounded-full w-100 animate-pulse" />
        </li>
    </ul>
}