
    import profileImage from '/public/images/profile.png';
import '/src/app/css/common.css'
export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-slate-800 border-b border-gray-300">
            <div className="flex items-center">
                <img
                    src={profileImage.src}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                />
            </div>
        </header>
    );
}