import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Map from '@arcgis/core/Map';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Expand from '@arcgis/core/widgets/Expand';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charset="utf-8" />
		<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
		<link rel="icon" href="https://i.ibb.co/CM7x3FX/1628329259246.png" />
	
		
		<title>GeoJSONLayer | Maricla Kandzorra | NewYork Venues | ArcGIS API for JavaScript 5.16</title>


		<link rel="stylesheet" href="https://js.arcgis.com/4.16/esri/themes/light/main.css" />
		<script src="https://js.arcgis.com/4.16/"></script>
        
      </Head>
	  
	  <Arcgis />
	  <footer className={styles.footer}>
        <a
          href="mboss-us/index.js"
          target="_blank"
          rel="noopener noreferrer">
          <p>Powered by MBOSS.US June/2022(c)Maricla Kandzorra Martelli</p>
          <span className={styles.logo}>
            <Image src="https://i.ibb.co/CM7x3FX/1628329259246.png" alt="Mboss.US Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
	</div>  
  );
}
