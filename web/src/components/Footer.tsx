import Logo from '@/components/Logo';
import React, { ReactNode } from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#283646] pb-12 pt-7">
      <div className="container flex text-white">
        <div className="flex-1">
          <h3 className="mb-4 font-bold">Về Annhien.vn</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <Li>Giới thiệu annhien.vn</Li>
            <Li>Liên hệ</Li>
            <Li>Điều khoản dịch vụ</Li>
            <Li>Chính sách bảo mật</Li>
            <Li>Chính sách hoàn trả</Li>
            <Li>Chính sách vận chuyển</Li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="mb-4 font-bold">Hỗ trợ khách hàng</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <Li>Hỏi đáp</Li>
            <Li>Hướng dẫn đặt hàng </Li>
            <Li>Hướng dẫn thanh toán</Li>
            <Li>Chính sách bảo mật</Li>
            <Li>Chính sách bảo hành </Li>
            <Li>Hỗ trợ kỹ thuật</Li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="mb-4 font-bold">Sản phẩm</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <Li>Sản phẩm mới </Li>
            <Li>Chương trình giảm giá</Li>
            <Li>Sản phẩm nổi bật</Li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col">
          <span className="mx-auto block">
            <Logo />
          </span>
          <span className="mt-5 text-gray-400">
            Bản quyền © 2016 Annhien.vn
          </span>
          <span className="mt-4 text-xl font-semibold">
            Công Ty cổ phần Tinh Dầu An Nhiên
          </span>
          <span className="mt-4 text-sm">Hotline: 19001998</span>
          <span className="mt-6 text-sm">
            Trụ sở: khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố
            Hồ Chí Minh.
          </span>
        </div>
      </div>
    </footer>
  );
};

type LiProps = {
  children: ReactNode;
};

const Li = ({ children }: LiProps) => {
  return <li className="hover:cursor-pointer hover:underline">{children}</li>;
};

export default Footer;
