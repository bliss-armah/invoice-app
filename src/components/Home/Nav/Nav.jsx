import logo from "../../../assets/logo.svg"
import profile from "../../../assets/profile.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
    return (
        <div className="flex pr-6 justify-between items-center text-3xl bg-dark-light h-auto">
            <div className="flex w-4/5 justify-between items-center pr-6 border-tint-violet border-r-2 ">
                <img src={logo} alt="logo"/>
                <FontAwesomeIcon icon={faMoon} color="#9277FF" className="text-2xl"/>
            </div>
            <img className="w-8 h-8 border" src={profile} alt="profile" />

        </div>
    )
}

export default Nav