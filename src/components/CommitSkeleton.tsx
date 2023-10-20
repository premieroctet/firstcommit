import noAvatar from "../assets/no-avatar.png";

export default function CommitSkeleton() {
    return <div className="w-[500px] bg-[white] text-left flex items-center text-[black] no-underline transition-all duration-[0.2s] ease-[ease-in-out] mt-[50px] mx-auto my-0 p-2.5 rounded-[5px] hover:scale-[1.04] animate-pulse">
        <img src={noAvatar.src} alt="Avatar" className="w-[50px] rounded mr-2.5" />
        <div>
            <div className="h-4 bg-gray-200 rounded-full w-[100px]"></div>
            <div className="h-5 bg-gray-200 rounded-full w-[300px] mt-[5px]"></div>
        </div>
    </div>
}
