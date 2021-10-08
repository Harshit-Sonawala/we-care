import { Person } from '@material-ui/icons'
import { globalIconStyle } from "../assets/GlobalStyles"

const ProviderAccount = ({ providerData }) => {
    return (
        <>
            <div className="flex-row">
                <div className='circle-avatar'>
                    <Person style={globalIconStyle} />
                </div>
            </div>
            <h3 className='heading-type3 center-text'>{providerData.providerDataCompanyName}</h3>
            <div className='flex-row'>
                <p className='para-type2'>Account Manager:</p><p className='para-type1'>{providerData.providerDataFirstName} {providerData.providerDataLastName}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>Email:</p><p className='para-type1'>{providerData.providerDataEmail}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>Phone Number:</p><p className='para-type1'>{providerData.providerDataNumber}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>About:</p><p className='para-type1'>{providerData.providerDataDescription}</p>
            </div>
            <div className='flex-row'>
                <p className='para-type2'>Services:</p>
            </div>
            {((providerData.providerDataServices).length !== 0) ? providerData.providerDataServices.map((service) => (
                <div className='flex-row'>
                    <p className='para-type1'>{service}</p>
                </div>
            )) : <div className='flex-row'>
                <p className='para-type1'>Please Add Services</p>
            </div>
            }
        </>
    )
}

export default ProviderAccount
