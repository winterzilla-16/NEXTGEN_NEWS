import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto text-center">
        <div className="w-full bg-orange-500 h-2 mt-4"></div>
        <h1 className="text-2xl font-semibold italic mb-2">
          NEWS GENS
        </h1>
        <p className="text-base">
          เว็บไซต์ข่าวกีฬาที่เกาะติดทุกสถานการณ์ และอัพเดททุกความเป็นไป
          <br />
          รวบรวมทั้งข่าวในไทย และ ต่างประเทศ
        </p>
      </div>
      <div className="w-full bg-orange-500 h-2 mt-4"></div>
    </footer>
  );
};

export default Footer;
