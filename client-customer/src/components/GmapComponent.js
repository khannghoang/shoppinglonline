import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="flexgmap">
        <h2 className="text-center">VỊ TRÍ CỬA HÀNG</h2>
        <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.787874152137!2d106.69744041046272!3d10.827539189279834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmc!5e0!3m2!1svi!2s!4v1700996524042!5m2!1svi!2s"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    );
  }
}
export default Gmap;
