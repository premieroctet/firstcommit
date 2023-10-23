import { formatDistance, subDays } from "date-fns";
import { GithubCommit } from "../../types"
import noAvatar from "../assets/no-avatar.png";

export default function Commit({ commit }: { commit: GithubCommit }) {
    return <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="max-w-[90%] md:max-w-[500px] bg-[white] text-left flex items-center text-[black] no-underline transition-all duration-[0.2s] ease-[ease-in-out] mt-[50px] mx-auto my-0 p-2.5 rounded-[5px] hover:scale-[1.04]">
        <img src={commit.author.avatar_url || noAvatar.src} alt="Avatar" className="w-[50px] rounded mr-2.5" />
        <div>
            <p className="text-[1.2rem] font-bold w-[inherit] whitespace-nowrap overflow-hidden text-ellipsis">{commit.commit.message}</p>
            <p className="text-[#636e72] w-[inherit] mt-[5px]">
                <b>{commit.commit.committer.name}</b> commited{" "}
                {formatDistance(
                    subDays(new Date(commit.commit.committer.date), 3),
                    new Date()
                )}{" "}
                ago
            </p>
        </div>
    </a>
}
