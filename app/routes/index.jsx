import {
    Form,
    useActionData,
    useTransition as useNavigation,
} from '@remix-run/react';
import { getClientIPAddress } from "remix-utils/get-client-ip-address";

import homeStyles from '~/styles/home.css';
import {getStoredNotes, storeNotes} from "~/data/notes";
import {json, redirect} from "@remix-run/node";

export async function loader({ request }) {

    // using the request
	let ipAddress = getClientIPAddress(request);
	// or using the headers
	// let ipAddress = getClientIPAddress(request.headers);
    console.log("FRA",ipAddress)
}


export async function action({request}) {
    console.log("FRA",request.connection)
    const formData = await request.formData();
    const IPData = Object.fromEntries(formData);

    if (IPData.address.trim().length < 12) {
        return {message: 'Invalid IP ADDRESS - must be at least 5 characters long.'};
    } else {
        const response = await
            fetch(
                `https://geo.ipify.org/api/v2/country?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${IPData.address}`
            );
        const geoLoc = await response.json();
        console.log(geoLoc)
        // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
        return {
            ip: geoLoc.ip,
            location: geoLoc.location.region + ", " + geoLoc.location.country,
            timezone: geoLoc.location.timezone,
            isp: geoLoc.isp
        };

    }
}

export default function Index() {
    const data = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <main id="content">
            <h1>IP Address Tracker</h1>
            <Form method="post" id="ip-form">
                <p>
                    <input type="text" id="address" name="address" placeholder={"Search for any IP address or domain"}
                           required/>
                </p>
                <div className="form-actions">
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Searching...' : '>'}
                    </button>
                </div>
            </Form>
            {data?.message ? <p>{data.message}</p> :

                <table style={{borderCollapse: "collapse", width: "100%"}}>
                    <thead>
                    <tr>
                        <th style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontSize: "12px",
                            color: "gray",
                            textTransform: "uppercase"
                        }}>
                            IP ADDRESS
                        </th>
                        <th style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontSize: "12px",
                            color: "gray",
                            textTransform: "uppercase"
                        }}>
                            LOCATION
                        </th>
                        <th style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontSize: "12px",
                            color: "gray",
                            textTransform: "uppercase"
                        }}>
                            TIMEZONE
                        </th>
                        <th style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontSize: "12px",
                            color: "gray",
                            textTransform: "uppercase"
                        }}>
                            ISP
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.ip||"Loading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.location||"Loading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.timezone||"Loading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.isp||"Loading..."}
                        </td>
                    </tr>
                    </tbody>
                </table>
            }
        </main>
    );
}


export function links() {
    return [{rel: 'stylesheet', href: homeStyles}];
}
