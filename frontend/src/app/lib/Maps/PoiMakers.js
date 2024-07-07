import React, { useState, useEffect } from 'react';
import { Typography, Link, Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import useProductDisplay from '@/app/hooks/useProductDisplay';



const PoiMarkers = ({ pois }) => {
    const { products, loading, error } = useProductDisplay();
    const [selectedPoi, setSelectedPoi] = useState(null);



    const handleMarkerClick = (poi) => {
        setSelectedPoi(poi);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {pois.map((poi) => (
                <React.Fragment key={poi.name}>
                    <AdvancedMarker position={poi.location} onClick={() => handleMarkerClick(poi)}>
                        <Pin background={'#FF0000'} glyphColor={'#fff'} borderColor={'#000'} />
                    </AdvancedMarker>
                    {selectedPoi === poi && (
                        <InfoWindow position={poi.location} onCloseClick={() => setSelectedPoi(null)}>
                            <Box style={{ marginBottom: '16px' }}>
                                <Link
                                    href={`https://www.google.com/maps?q=${poi.location.lat},${poi.location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    📍前往餐廳
                                </Link>
                                <Typography variant="h6" style={{ margin: '10px 0' }}>
                                    {poi.key}
                                </Typography>
                                <Typography variant="p">
                                    跟老闆說: {poi.secret}
                                </Typography>
                                {products.filter(product => product.userId === poi.userID).map(product => (
                                    <div key={product._id}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography style={{ marginLeft: '5px' }}>
                                                {product.dailyQuantity >= 5 ? "✅" : product.dailyQuantity > 0 ? "⚠️" : "⛔️"}
                                            </Typography>
                                            <Typography variant="p" style={{ margin: '5px 0', marginLeft: '5px' }}>
                                                {product.productName}
                                            </Typography>
                                            <Typography variant="p" style={{ marginLeft: '5px' }}>
                                                📆: 到{product.campaignExpiration.split('T')[0]}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        </InfoWindow >
                    )}
                </React.Fragment >
            ))}
        </>
    );
};

export default PoiMarkers;