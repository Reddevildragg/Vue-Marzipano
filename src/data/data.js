export const data = {
    "scenes": [
        {
            "id": "0-image1",
            "name": "Image1",
            "levels": [
                {
                    "tileSize": 256,
                    "size": 256,
                    "fallbackOnly": true
                },
                {
                    "tileSize": 512,
                    "size": 512
                }
            ],
            "faceSize": 256,
            "initialViewParameters": {
                "yaw": 0.7021652716610269,
                "pitch": 0,
                "fov": 1.3955976429365986
            },
            "linkHotspots": [
                {
                    "id": 2,
                    "yaw": 2.3432478663489595,
                    "pitch": -0.011387538498556893,
                    "rotation": 6.283185307179586,
                    "target": "1-image3"
                }
            ],
            "infoHotspots": [
                {
                    "yaw": -0.00038049728702915786,
                    "pitch": 0.014985751462495145,
                    "title": "Oriente Station",
                    "text": "The Oriente Station is one of the most important bus and train stations in the city. Designed by the Spanish architect and engineer Santiago Calatrava, it has an enormous metal skeleton that covers the eight train lines and its platforms. Finished in 1998 to serve the Expo’98 and, later, the Parque das Nações area, in its surroundings are companies, services, hotels, bars, animation, as well as the well known Vasco da Gama shopping centre."
                }
            ]
        },
        {
            "id": "1-image3",
            "name": "Image3",
            "levels": [
                {
                    "tileSize": 256,
                    "size": 256,
                    "fallbackOnly": true
                },
                {
                    "tileSize": 512,
                    "size": 512
                }
            ],
            "faceSize": 118.5,
            "initialViewParameters": {
                "pitch": 0,
                "yaw": 0,
                "fov": 1.5707963267948966
            },
            "linkHotspots": [
                {
                    "id": 1,
                    "yaw": 0.09040434572636968,
                    "pitch": 0.0978033280921693,
                    "rotation": 0,
                    "target": "0-image1"
                }
            ],
            "infoHotspots": [
            ]
        }
    ],
    "name": "Project Title",
    "settings": {
        "mouseViewMode": "drag",
        "autorotateEnabled": true,
        "fullscreenButton": true,
        "viewControlButtons": true
    }
};
