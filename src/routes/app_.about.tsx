import LeftArrow from '@/components/icons/left-arrow'
import TrackiTransparent from '@/components/icons/logo-trans-nopad'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app_/about')({
  component: About,
})

function About() {
  return (
    <article aria-labelledby="aboutTitle" className="h-full overflow-auto">
      <nav className="sticky top-0 flex items-center justify-between bg-black px-6 py-8 md:p-10">
        <Link to="/" className="h-8 w-8">
          <LeftArrow className="h-full" />
        </Link>
        <TrackiTransparent className="h-8 w-8" />
        <div className="h-8 w-8"></div>
      </nav>

      <div className="px-6 pb-6 md:px-16 md:pb-16">
        <div className="mx-auto md:max-w-prose">
          <h1 className="w-full text-2xl md:text-4xl" id="aboutTitle">
            About tracki
          </h1>

          <p className="mt-4">
            Tracki is dolor sit amet, consectetur adipiscing elit. Aliquam at
            ultrices quam. Nunc ac pellentesque sem. Curabitur erat diam,
            pulvinar quis orci id, pellentesque facilisis massa. Donec aliquam
            tortor non elit eleifend porta. Praesent pellentesque ante molestie
            lorem vulputate tristique. Suspendisse quis vulputate quam.
            Curabitur blandit bibendum velit, vitae posuere neque ullamcorper
            non.
          </p>
          <p className="mt-4">
            Vestibulum feugiat ultricies mi. Donec lacus purus, pellentesque at
            tempus quis, porttitor et felis. Phasellus nec faucibus nisl, sed
            dictum odio. Nam nulla sapien, pulvinar vel accumsan ac, blandit
            dictum turpis. Aliquam congue vel ligula in venenatis. Duis eu
            posuere lorem, at varius libero. Nullam ac dapibus quam, ac faucibus
            tortor. Mauris efficitur quam quis tellus dictum consectetur. Sed
            odio eros, suscipit at scelerisque ac, egestas id erat. Praesent ut
            nibh eu nunc vestibulum bibendum. Pellentesque scelerisque massa at
            metus porta porta. Phasellus accumsan cursus tincidunt. Nam et metus
            condimentum, hendrerit risus sit amet, dictum dui.
          </p>
          <p className="mt-4">
            Donec non mi neque. Nam id elementum sem. Nullam quis mollis nisi.
            Phasellus et sem congue, mattis turpis vel, vehicula sapien.
            Curabitur sit amet neque sit amet urna semper auctor non eget diam.
            Vivamus sed nunc et nisi tincidunt imperdiet nec quis elit. Nunc in
            mattis neque. Nulla auctor justo urna. Morbi id cursus enim. Proin
            eleifend molestie tempus. Sed at odio id tortor luctus lobortis in
            convallis felis.
          </p>
          <p className="mt-4">
            Sed et sollicitudin velit, et pellentesque nulla. Phasellus auctor
            ligula et neque aliquet gravida. Duis luctus dui sed molestie
            scelerisque. Etiam a aliquam metus. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean mollis massa quis orci
            vestibulum, vel fermentum velit tincidunt. Nulla hendrerit eu nulla
            vitae mollis. Duis augue ante, viverra in cursus a, dignissim a
            urna. Donec dignissim dui mattis, mattis nibh egestas, commodo
            mauris. Aenean vel enim eget sem facilisis sollicitudin. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Pellentesque id neque a sapien suscipit vehicula
            suscipit vel tortor. Aenean convallis hendrerit tellus, vel
            ullamcorper arcu. Proin mattis, sem non egestas tristique, magna
            augue viverra augue, id pretium magna velit eu tortor. Duis bibendum
            vulputate fringilla.
          </p>
          <p className="mt-4">
            Ut vel ultrices ipsum, quis molestie leo. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin efficitur, urna vehicula dictum semper,
            est nisi egestas risus, nec sodales nisl lorem vitae nunc. Ut ut
            ornare tellus. Suspendisse in ante et odio eleifend finibus quis non
            velit. Nullam dignissim, quam vel dapibus convallis, dui arcu
            efficitur tellus, non pharetra erat ligula tincidunt elit.
          </p>
        </div>
      </div>
    </article>
  )
}
