import truck from 'public/truck.svg';
import bag from 'public/bag.svg';
import support from 'public/support.svg';
import returnIcon from 'public/return.svg';
import whyChooseUs from 'public/images/tinh-dau-2.jpg';
import Image from 'next/image';

function WhyChooseUs() {
  return (
    <div className="why-choose-section py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-6/12">
            <h2 className="section-title mb-4 text-3xl font-bold text-[#FFAB66]">
              Tại sao chọn chúng tôi?
            </h2>
            <p>
              Chúng tôi không chỉ mang đến sản phẩm nội thất cao cấp, mà còn
              mang đến cho bạn những trải nghiệm mua sắm hoàn hảo. Hãy khám phá
              những lý do bạn nên tin tưởng chúng tôi:
            </p>

            <div className="my-8 grid grid-cols-2 gap-6">
              <div className="feature">
                <div className="icon mb-4">
                  <Image src={truck} alt="Image" className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFAB66]">
                  Giao hàng nhanh &amp; Miễn phí
                </h3>
                <p>
                  Đảm bảo giao hàng trong thời gian ngắn nhất, hoàn toàn miễn
                  phí cho mọi đơn hàng, giúp bạn nhận sản phẩm nhanh chóng và
                  tiện lợi.
                </p>
              </div>

              <div className="feature">
                <div className="icon mb-4">
                  <Image src={bag} alt="Image" className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFAB66]">
                  Mua sắm dễ dàng
                </h3>
                <p>
                  Giao diện thân thiện, quy trình đặt hàng đơn giản giúp bạn mua
                  sắm chỉ với vài thao tác mà không gặp bất kỳ trở ngại nào.
                </p>
              </div>

              <div className="feature">
                <div className="icon mb-4">
                  <Image src={support} alt="Image" className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFAB66]">
                  Hỗ trợ 24/7
                </h3>
                <p>
                  Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn bất
                  kỳ lúc nào, đảm bảo bạn luôn được chăm sóc chu đáo.
                </p>
              </div>

              <div className="feature">
                <div className="icon mb-4">
                  <Image src={returnIcon} alt="Image" className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFAB66]">
                  Hoàn trả dễ dàng
                </h3>
                <p>
                  Chính sách đổi trả linh hoạt, không rườm rà, mang lại sự yên
                  tâm tuyệt đối khi bạn chọn mua sản phẩm của chúng tôi.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-5/12">
            <div className="img-wrap w-[600px] h-[620px] relative">
              <Image
                src={whyChooseUs}
                alt="Image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
