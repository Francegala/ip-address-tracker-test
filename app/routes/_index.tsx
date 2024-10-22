/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Form, useActionData, useLoaderData,
} from "@remix-run/react";


import {ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {ReactNode, useEffect, useState, lazy, Suspense} from "react";


// https://remix.run/resources/remix-utils
import {getClientIPAddress} from "remix-utils/get-client-ip-address";

//MAP
let LazyImported = lazy(() => import("../components/MainNavigation"));

export function ClientOnly({children}: { children: ReactNode }) {
    let [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted ? <>{children}</> : null;
}


// 81.98.36.111
export async function loader({request}: LoaderFunctionArgs) {
    // using the request
    const ipAddress = getClientIPAddress(request) ?? getClientIPAddress(request.headers) ?? '3.11.106.35'

    const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${ipAddress}`);
    const geoLoc = await response.json();
    const nominatimURL = await fetch('https://nominatim.openstreetmap.org/search?addressDetails=1&q=' + geoLoc.location.region + ", " + geoLoc.location.country + '&format=json&limit=1');
    const coordinates = await nominatimURL.json();

    return json({
        ip: geoLoc.ip,
        location: geoLoc.location.region + ", " + geoLoc.location.country,
        timezone: geoLoc.location.timezone,
        isp: geoLoc.isp,
        lat: coordinates[0].lat,
        lon: coordinates[0].lon
    });
}


export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData();
    const IPData = Object.fromEntries(formData);
    if (IPData.address.length < 8 || !(/^\d+(\.\d+)+$/.test(IPData.address))) {
        return {message: 'Invalid IP v4 ADDRESS - must be at least 5 characters long.'};
    } else {
        const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${IPData.address}`);
        const geoLoc = await response.json();
        const nominatimURL = await fetch('https://nominatim.openstreetmap.org/search?addressDetails=1&q=' + geoLoc.location.region + ", " + geoLoc.location.country + '&format=json&limit=1');
        const coordinates = await nominatimURL.json();

        return {
            ip: geoLoc.ip,
            location: geoLoc.location.region + ", " + geoLoc.location.country,
            timezone: geoLoc.location.timezone,
            isp: geoLoc.isp,
            lat: coordinates[0].lat,
            lon: coordinates[0].lon

        };

    }
}

export default function Index() {
    const dataPosted = useActionData();
    const dataFetched = useLoaderData();

    const data = dataPosted || dataFetched;

    return (<>
    <main className={"content"}>
            <div className={"bgImage"}>
                <h1>IP Address Tracker</h1>

                {data?.message ? <p>{data.message}</p> : <>
                <Form method="post" id="ip-form">
                    <p>
                        <input type="text" id="address" name="address"
                               placeholder={"Search for any IP address or domain"}
                               required/>
                    </p>
                    <div className="form-actions">
                        <button>
                            {">"}
                        </button>
                    </div>
                </Form>
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
                            {data?.ip || "L eoading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.location || "Loading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.timezone || "Loading..."}
                        </td>
                        <td style={{border: "1px solid #ddd", padding: "8px", fontSize: "16px", color: "black"}}>
                            {data?.isp || "Loading..."}
                        </td>
                    </tr>
                    </tbody>
                </table>
                 </>}
                </div>

                    <div className="div">
                    <ClientOnly>
                    <Suspense fallback="">
                    <LazyImported lat={data?.lat || "Loading..."} lon={data?.lon || "Loading..."}/>
                        </Suspense>
                    </ClientOnly>
        </div>

        </main>
    </>
);
}