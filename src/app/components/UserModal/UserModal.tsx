import { logout } from "@/app/services/auth.service"
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
export interface UserModalProps {
    onClose: () => void
}
export default function UserModal({ onClose }: UserModalProps) {
    const disconnect = async () => {
        await logout()
    }

    const handleCloseClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={handleCloseClick}>
            <div className="modal right-[70px]" onClick={(e) => e.stopPropagation()}>
                <div className="relative shadow w-36 bg-white rounded-lg">
                    <ul className="text-gray place-content-center">
                        <li
                            className="p-3 rounded-t-lg hover:bg-gray-100">
                            <Link className="w-full flex" href="/secret-list">
                                Secret list
                            </Link>
                        </li>
                        <li className="p-3 hover:bg-gray-100">
                            <button className="w-full flex" onClick={disconnect}>
                                <LogoutIcon></LogoutIcon>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}