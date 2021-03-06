import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { decode } from '@mapbox/polyline';

class SegmentMap extends Component {
  render() {
    const { map, height, width } = this.props;
    // buffer around the segment polyline
    const BUFFER = 0.05;
    const ASPECT_RATIO = width / height;
    let LATITUDE_DELTA = 0.0085;
    let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    let region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    let segmentPolyline;
    if (map && map.polyline) {
      const decoded = decode(map.polyline);
      const coords = decoded.map(coord => ({
        latitude: Number(coord[0]),
        longitude: Number(coord[1])
      }));
      const beginCoord = coords[0];
      const endCoord = coords[coords.length - 1];
      const centerLat = (endCoord.latitude + beginCoord.latitude) / 2;
      const centerLong = (endCoord.longitude + beginCoord.longitude) / 2;
      LATITUDE_DELTA =
        Math.max(endCoord.latitude, beginCoord.latitude) -
        Math.min(endCoord.latitude, beginCoord.latitude);
      LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO + BUFFER;
      region = {
        latitude: centerLat,
        longitude: centerLong,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      segmentPolyline = (
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={3}
          strokeColor="#ef473a"
        />
      );
    }

    return (
      <MapView
        style={{
          ...StyleSheet.absoluteFillObject,
          width: width,
          height: height
        }}
        region={region}
      >
        {segmentPolyline}
      </MapView>
    );
  }
}

const { number, shape } = PropTypes;

SegmentMap.propTypes = {
  map: shape({}),
  height: number,
  width: number
};

export default SegmentMap;
