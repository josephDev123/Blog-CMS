
export function RoleBanner(){
    const style = {
        boxShadow:'0 0 10px #ECECEC'
    }
    return(
        <section className='roles_billboard mt-5' style={style}>
                <section className='img_wrapper'>
                    <img className='img' src='/images/permission.png' width='' height='' alt=''/>
                </section>

                <section className='content_wrapper'>
                    <blockquote>
                        <p>Success means doing the best we can with what we have. Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be.” - Zig Ziglar</p>

                    </blockquote>

                    <blockquote>
                        <p>“Failure is not the opposite of success; it’s part of success.” - Arianna Huffington</p>
                    </blockquote>
                </section>
            </section>
    )
}