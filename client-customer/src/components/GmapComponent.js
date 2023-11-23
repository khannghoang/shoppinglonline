import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="flexgmap">
        <h2 className="text-center">VỊ TRÍ CỬA HÀNG</h2>
        <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31353.255222720607!2d106.6757508!3d10.7992923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1700312089220!5m2!1svi!2s"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    );
  }
}
export default Gmap;
