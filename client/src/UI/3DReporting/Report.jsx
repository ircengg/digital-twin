
const Report = ({ data }) => {
    return (
        <div>
            <h5 style={{ textAlign: 'center', margin: '2px', borderBottom: '2px solid blue' }}>{data.name}</h5>
            <div>
                <table className='highlight mdltbl'>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Material</td>
                            <td>{data.mat}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Installation Year</td>
                            <td>{data.InstallationYear}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Design Pressure</td>
                            <td>{data.P} KSC</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Design Temperature</td>
                            <td>{data.T} <sup>o</sup>C</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Outer Diameter</td>
                            <td>{data.D} mm</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Nominal Thickness</td>
                            <td>{data.tn} mm</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>Minimum Required Thickness</td>
                            <td>{data.tr} mm</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ fontWeight: 'bold' }}>
                                <a href="https://drive.google.com/file/d/1gmBKxJ_5ElAkeXO_YiGTwcXq25K5wP9g/view?usp=sharing" target='_blank'>View Report</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Report