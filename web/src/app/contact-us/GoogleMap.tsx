import React from 'react';

function GoogleMap() {
  return (
    <div className="flex basic-full w-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 h-[30rem] mt-10">
      <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-primary">
        Địa chỉ: Khu phố 6, phường Linh Trung, quận Thủ Đức, TP.Hồ Chí Minh
      </h3>
      <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-primary">
                  Đến ngay cửa hàng của chúng tôi để trải nghiệm dịch vụ tốt nhất
                </span>
      </div>
      <div className="flex flex-1 w-full h-[400px] rounded-lg mt-4 from-violet-500 via-purple-500 to-blue-500">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4761.044466395239!2d106.78918695467287!3d10.871281277474065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1728972275911!5m2!1svi!2s"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
}

export default GoogleMap;