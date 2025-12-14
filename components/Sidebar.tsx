import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export default function Sidebar() {
    return (
        <aside className="fixed left-2 top-15 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto">
            <div className="flex items-center justify-between p-2 mb-4 text-primary-text">
                <h2 className="font-bold text-xl">
                    Dodane Pesmi
                </h2>

                <Link
                    href="upload-song"
                    className="p-2 rounded-full hover:bg-hover flex items-center justify-center"
                >
                    <LuPlus size={30} />
                </Link>
            </div>
        </aside>
    );
}
