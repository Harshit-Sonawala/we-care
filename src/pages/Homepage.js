import Showcase from '../components/Showcase'
import LandingCard from '../components/LandingCard'
import trustedProfessional from '../assets/images/Businessman _Monochromatic.png'
import easyPayments from '../assets/images/Calculator_Monochromatic.png'
import qualityService from '../assets/images/Checklist_Monochromatic.png'

const Homepage = () => {
    return (
        <>
            <Showcase />
            <LandingCard
                title='Trusted Professionals'
                subtitle='We connect you with the top class service professionals right at your doorstep.'
                imagePath={trustedProfessional}
                altText='Image 1'
            />
            <LandingCard
                title='Quick & Easy Payments'
                subtitle='We provide all payment options with the utmost of security, to make your life easier.'
                imagePath={easyPayments}
                altText='Image 2'
            />
            <LandingCard
                title='Quality Services'
                subtitle='Verified professionals with years of expertise in their field that provide best quality services.'
                imagePath={qualityService}
                altText='Image 3'
            />
        </>
    )
}

export default Homepage
