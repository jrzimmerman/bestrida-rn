import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { decode } from '@mapbox/polyline';

class SegmentMap extends Component {
  render() {
    const { map, height, width } = this.props;
    let segmentPolyline;

    const ASPECT_RATIO = width / height;
    let LATITUDE_DELTA = 0.0085;
    let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    let region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    if (map && map.polyline) {
      const decoded = decode(map.polyline);
      const coords = decoded.map(coord => ({
        latitude: Number(coord[0]),
        longitude: Number(coord[1])
      }));
      const beginCoord = coords[0];
      // const endCoord = coords[coords.length - 1];
      // const centerLat = endCoord.latitude + beginCoord.latitude / 2;
      // const centerLong = endCoord.longitude + beginCoord.longitude / 2;
      // LATITUDE_DELTA =
      //   Math.max(endCoord.latitude, beginCoord.latitude) -
      //   Math.min(endCoord.latitude, beginCoord.latitude);
      LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
      region = {
        latitude: beginCoord.latitude,
        longitude: beginCoord.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      segmentPolyline = (
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={5}
          strokeColor="#ef473a"
        />
      );
    }

    return (
      <MapView
        style={{
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
