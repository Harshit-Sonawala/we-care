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
                title="Trusted Professionals"
                subtitle="Top class service professionals right at your doorstep."
                imagePath={trustedProfessional}
                altText="Image 1"
            />
            <LandingCard
                title="Quick & Easy Payments"
                subtitle="All payment options with utmost security, to make your life easier."
                imagePath={easyPayments}
                altText="Image 2"
            />
            <LandingCard
                title="Quality Services"
                subtitle="Hello world this is an example of a subtitle."
                imagePath={qualityService}
                altText="Image 3"
            />
        </>
    )
}

export default Homepage
