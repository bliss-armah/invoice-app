import logo from "../../../assets/logo.svg"
import profile from "../../../assets/profile.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {

    return (
        <div className="flex fixed justify-start items-center space-x-8 md:space-x-12 text-3xl bg-dark-light
            h-auto w-full lg:h-full lg:w-24 lg:flex-col lg: lg:static lg:space-y-14 lg:space-x-0">

            <div className="flex lg:flex-col lg:items-center w-4/5 md:w-10/12 lg:h-full pr-7
                justify-between items-center border-tint-violet border-r-2 lg:border-b-2 lg:border-r-0">
                <div>
                    <img className="" src={logo} alt="logo"/>
                </div>
                <FontAwesomeIcon icon={faMoon} className="hover:text-icon-hover text-2xl text-light-violet" 
                />
            </div>
            <div className="w-8 h-8">
                <img src={profile} alt="profile" />
            </div>
        </div>
    )
}

export default Nav