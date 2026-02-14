import { User } from "lucide-react";

const AccountDropdown = ({ isOpen, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="dropdown-menu">
      <div className="dropdown-item">
        <User size={16} />
        {user.name}
      </div>
    </div>
  );
};

export default AccountDropdown;
