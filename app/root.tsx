/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Form,
  useActionData, useLoaderData,
} from '@remix-run/react';
// https://remix.run/resources/remix-utils
import {getClientIPAddress} from "remix-utils/get-client-ip-address";

import homeStyles from '~/styles/home.css';

import {ActionFunctionArgs, json, LoaderFunctionArgs, redirect} from "@remix-run/node";

import appStylesHref from "./app.css?url";

// 81.98.36.111
export async function loader({ request }: LoaderFunctionArgs) {
  // using the request
  const ipAddress = getClientIPAddress(request) ?? getClientIPAddress(request.headers) ?? '3.11.106.35'

  const response = await
      fetch(
          `https://geo.ipify.org/api/v2/country?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${ipAddress}`
      );
  const geoLoc = await response.json();
  
  
  return json({ ip: geoLoc.ip,
      location: geoLoc.location.region + ", " + geoLoc.location.country,
      timezone: geoLoc.location.timezone,
      isp: geoLoc.isp });
}


export async function action({ request }: ActionFunctionArgs ){

  const formData = await request.formData();
  const IPData = Object.fromEntries(formData);
  if (IPData.address.length < 8 || !(/^\d+(\.\d+)+$/.test(IPData.address))) {
      return {message: 'Invalid IP v4 ADDRESS - must be at least 5 characters long.'};
  } else {
      const response = await
          fetch(
              `https://geo.ipify.org/api/v2/country?apiKey=at_N8owOeBcMSoi95ZyenAIerCNzi36E&ipAddress=${IPData.address}`
          );
      const geoLoc = await response.json();

      return {
          ip: geoLoc.ip,
          location: geoLoc.location.region + ", " + geoLoc.location.country,
          timezone: geoLoc.location.timezone,
          isp: geoLoc.isp
      };

  }
}


export default function App() {
  const dataPosted = useActionData() ;
  const dataFetched = useLoaderData();

  const data = dataPosted||dataFetched;
  return (
      <main id="content">
          <h1>IP Address Tracker</h1>
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
                          {data?.ip || "Loading..."}
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
          }
      </main>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
