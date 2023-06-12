import { useRef, useState } from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle(styles.responsive_nav);
    }
  };

  const login = true; // Change this value as needed

  return (
    <header className={styles.header}>
      <h3 className={styles.logo}>Galoy Withdraw</h3>
      <nav ref={navRef} className={styles.nav}>
        <Link className={styles.nav_item} href="/#">
          About
        </Link>
        <Link className={styles.nav_item} href="/#">
          How it works
        </Link>
        <Link className={styles.nav_item} href="/#">
          Help
        </Link>
      </nav>
      <div className={styles.right_section}>
        <button className={styles.add_new_button}>
          <AddIcon />
          New Link
        </button>
        {login ? (
          <div>
            <div className={styles.dropdown}>
              <ArrowDropDownCircleIcon
                onClick={toggleDropdown}
              ></ArrowDropDownCircleIcon>

              {dropdownVisible && (
                <div className={styles.dropdown_content}>
                  <Link href="/profile"> Profile</Link>
                  <Link href="/settings"> Settings</Link>
                  <Link href="/logout"> Logout</Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
