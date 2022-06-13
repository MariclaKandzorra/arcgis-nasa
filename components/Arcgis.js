import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Map from '@arcgis/core/Map';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Home from '@arcgis/core/widgets/Home';
import Expand from '@arcgis/core/widgets/Expand';

function Arcgis({Map, GeoJSONLayer, MapView, FeatureLayer, Home, Legend, Expand}) {
            // If GeoJSON files are not on the same domain as your website, a CORS enabled server
            // or a proxy is required.
            const url =
                "mariclakandzorrageojsonsheet1.geojson";

            // Paste the url into a browser's address bar to download and view the attributes
            // in the GeoJSON file. These attributes include:
            // * mag - magnitude
            // * type - earthquake or other event such as nuclear test
            // * place - location of the event
            // * time - the time of the event
            // Use the Arcade Date() function to format time field into a human-readable format



            const clusterConfig = {
                type: "cluster",
                clusterRadius: "100px",
                // {cluster_count} is an aggregate field containing
                // the number of features comprised by the cluster
                popupTemplate: {
                    content: "This cluster represents {cluster_count} venues in Frankfurt am Main.",
                    fieldInfos: [{
                        fieldName: "cluster_count",
                        format: {
                            places: 0,
                            digitSeparator: true
                        }
                    }]
                },
                clusterMinSize: "24px",
                clusterMaxSize: "60px",
                labelingInfo: [{
                    deconflictionStrategy: "none",
                    labelExpressionInfo: {
                        expression: "Text($feature.cluster_count, '#,###')"
                    },
                    symbol: {
                        type: "text",
                        color: "#004a5d",
                        font: {
                            weight: "bold",
                            family: "Noto Sans",
                            size: "12px"
                        }
                    },
                    labelPlacement: "center-center"
                }]
            };

            const geojsonLayer = new GeoJSONLayer({
                title: "Frankfurt - Venues",
                url: url,
                copyright: "Maricla Kandzorra",
                featureReduction: clusterConfig,
                popupTemplate: {
                    title: "Venues",
                    content: "Name: {name}, <br> Eventtype: {eventtype},<br> People (max. Space in m2): {people1} {space1}, <br> Full Address: {full address}",
                    fieldInfos: [{
                        fieldName: "",
                        format: {
                            dateFormat: "short-date-short-time"
                        }
                    }]
                },
                renderer: {
                    type: "simple",
                    field: "mag",
                    symbol: {
                        type: "simple-marker",
                        size: 4,
                        color: "#69dcff",
                        outline: {
                            color: "rgba(0, 139, 174, 0.5)",
                            width: 5
                        }
                    }
                }
            });

            const map = new Map({
                basemap: "topo-vector",
                ground: "world-elevation",
                layers: [geojsonLayer]
            });

            const view = new MapView({
                container: "viewDiv",
                center: [8.682127, 50.110924],
                zoom: 15,
                map: map
            });

            const baseLayer = new FeatureLayer({
                portalItem: {
                    id: "2b93b06dc0dc4e809d3c8db5cb96ba69"
                },
                legendEnabled: true,
                popupEnabled: false,
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-fill",
                        color: [252, 250, 100],
                        outline: {
                            color: [0, 139, 174, 0.5],
                            width: 0.5
                        }
                    }
                },
                spatialReference: {
                    wkid: 4326
                }
            });

            view.ui.add(
                new Home({
                    view: view
                }),
                "top-left"
            );

            const legend = new Legend({
                view: view,
                container: "legendDiv"
            });

            const infoDiv = document.getElementById("infoDiv");
            view.ui.add(
                new Expand({
                    view: view,
                    content: infoDiv,
                    expandIconClass: "esri-icon-layer-list",
                    expanded: false
                }),
                "top-left"
            );

            const toggleButton = document.getElementById("cluster");

            // To turn off clustering on a layer, set the
            // featureReduction property to null
            toggleButton.addEventListener("click", function() {
                let fr = layer.featureReduction;
                layer.featureReduction =
                    fr && fr.type === "cluster" ? null : clusterConfig;
                toggleButton.innerText =
                    toggleButton.innerText === "Enable Clustering" ? "Disable Clustering" : "Enable Clustering";
            });
        );
	
	
    return (
        <main>
			<div id="viewDiv"></div>
			<div id="infoDiv" class="esri-widget">
				<button id="cluster" class="esri-button">Disable Clustering</button>
				<div id="legendDiv"></div>
			</div>
		</main>
    )      
}

export default Arcgis