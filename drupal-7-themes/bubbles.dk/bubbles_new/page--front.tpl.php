<?php
/**
 * Created by PhpStorm.
 * User: eduar
 * Date: 16/07/2016
 * Time: 21:36
 */
?>
<!--Created by remonts on 9/10/2015.-->


<!--- -------------------------Todo el contenidooo------------------------------------------------------------------ -->
<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand page-scroll" href="#page-top"></a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="page-scroll" href="#page-top">Forside</a>
                </li>
                <li>
                    <a class="page-scroll" href="#about">For privat</a>
                </li>
                <li>
                    <a class="page-scroll" href="#services">Priser</a>
                </li>
                <li>
                    <a class="page-scroll" href="#kort">Kort</a>
                </li>
                <li>
                    <a class="page-scroll" href="#Om"> Om os</a>
                </li>
                <li data-toggle="modal" data-target="#Kontakt">
                    <a class="page-scroll" href="#contact">Kontakt</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>
<header>
    <div class="background-wrap">
        <video id="video-bg-elem" preload="auto" autoplay="true" loop="loop" muted="muted">
            <source src="sites/all/themes/bubbles/img/video/video4.mp4" type="video/mp4">
            Video not supported
        </video>
    </div>
    <div class=" content_v header-content">
        <div class="header-content-inner">
            <h1 style="color: #fff;">Bubbles</h1>
            <h2>Vi passer p&aring dit hjem</h2>
            <a href="#about" style="color: #fff;"
               class="fa fa-angle-double-down fa-xx page-scroll animated infinite pulse"></a>
        </div>
    </div>
</header>
<!--
<section class="bg-user" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <img src="<?php /*print $base_root . $base_path . path_to_theme() */?>/img/bubbles/trabajadores.jpg" width="200" height=auto>
            </div>
            <div class=" col-md-offset-q-1 col-lg-6 col-md-6 text-justify">
                <h1 style="font-size: 36.5px;" class="section-heading">Reng&oslashring i private hjem </h1></p>
                <p class="text-justify">
                    Vi tilbyder alt inden for reng&oslashring i private hjem, lige fra almindelig daglig reng&oslashring
                    til komplet hovedreng&oslashring. Vores m&aringl er altid et h&oslashjt service niveau med basis i
                    loyalitet, og bedste priser.
                    Vi er altid klar til at give et uforpligtende tilbud p&aring din bolig, baseret på dine
                    individuelle krav<br>
                </p>
                <p>
                    Hovedrengøring indebærer:<br>
                    Støvsugning, afstøvning samt vask af alle gulve, døre,
                    paneler, ovenpå skabe (hvor muligt) samt andet
                    inventar. Rengøring af badeværelse og toilet.
                </p>
                <p>Rengøringen kan tilpasses kundens ønsker. Pris efter nærmere aftale.</p>

            </div>

            <div class="col-lg-3 col-md-3">
                <div class="bah">
                    <h3>Daglig reng&oslashring indeb&aelig;rer:</h3>
                    <i class="fa fa-angle-double-right"></i> St&oslashvsugning<br>
                    <i class="fa fa-angle-double-right"></i> Gulvvask<br>
                    <i class="fa fa-angle-double-right"></i> Afst&oslashvning<br>
                    <i class="fa fa-angle-double-right"></i> Reng&oslashring af badev&aelig;relse og toilet<br>
                    <i class="fa fa-angle-double-right"></i> + vind
                </div>
            </div>
        </div>
    </div>
</section>
-->
<section class="bg-user" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <img src="sites/all/themes/bubbles/img/bubbles/trabajadores.jpg" width="200" height=auto>
            </div>
            <div class=" col-lg-9 text-justify">
                <h1 style="font-size: 36.5px;" class="section-heading">Reng&oslashring i private hjem </h1></p>
                <p class="text-justify">
                    Vi tilbyder alt inden for reng&oslashring i private hjem, lige fra almindelig daglig reng&oslashring
                    til komplet hovedreng&oslashring. Vores m&aringl er altid et h&oslashjt service niveau med basis i
                    loyalitet, og bedste priser.
                    Vi er altid klar til at give et uforpligtende tilbud p&aring din bolig, baseret på dine
                    individuelle krav<br>
                </p>
                <p>
                    Hovedrengøring indebærer:<br>
                    Støvsugning, afstøvning samt vask af alle gulve, døre,
                    paneler, ovenpå skabe (hvor muligt) samt andet
                    inventar. Rengøring af badeværelse og toilet.
                </p>
                <p>Rengøringen kan tilpasses kundens ønsker. Pris efter nærmere aftale.</p>

                <h3>Daglig reng&oslashring indeb&aelig;rer:</h3>
                <i class="fa fa-angle-double-right"></i> St&oslashvsugning<br>
                <i class="fa fa-angle-double-right"></i> Gulvvask<br>
                <i class="fa fa-angle-double-right"></i> Afst&oslashvning<br>
                <i class="fa fa-angle-double-right"></i> Reng&oslashring af badev&aelig;relse og toilet<br>
                <i class="fa fa-angle-double-right"></i> + vind

            </div>
        </div>
    </div>
</section>
<section id="rengøringstilbud">
    <aside id="services" class="bg-dark_rengøringstilbud">
        <div class="container text-center">
            <div class=" col-lg-7 call-to-action margen_sup">
                <div class="text-center"><h1>F&aring et reng&oslashringstilbud fra <span class="mine color_b">Bubbles.</span>
                    </h1></div>
            </div>
            <div class=" col-lg-5 text-center">
                <h2>Hovedreng&oslashring </h2>
                <table class="table">
                    <tr class="active_blue">
                        <td class="text-center">Basic</td>
                        <td class="text-center">Priser basisrengøring</td>
                        <td class="text-center">Priser hovedrengøring</td>
                    </tr>

                    <tr>
                        <td class="text-left">mindre end 70 m<sup>2</sup</td>
                        <td class="text-center">200 kr</td>
                        <td class="text-center">450 kr</td>
                    </tr>
                    <tr>

                        <td class="text-left">op til 90 m<sup>2</sup></td>
                        <td class="text-center">320 kr</td>
                        <td class="text-center">500 kr</td>
                    </tr>
                    <tr>

                        <td class="text-left">op til 120 m<sup>2</sup></td>
                        <td class="text-center">440 kr</td>
                        <td class="text-center">650 kr</td>
                    </tr>
                    <tr>

                        <td class="text-left">op til 150 m<sup>2</sup></td>
                        <td class="text-center">560 kr</td>
                        <td class="text-center">800 kr</td>
                    </tr>
                    <tr>

                        <td class="text-left">op til 180 m<sup>2</sup></td>
                        <td class="text-center">680 kr</td>
                        <td class="text-center">950 kr</td>
                    </tr>


                </table>
            </div>
        </div>
    </aside>
</section>
<section id="kort">
    <div class="row">
        <div id="up" class="up">
            <div class="headkort ">
                <div id="headkort" class=" caja wow bounceIn">
                    <h1>Hvor k&oslashrer vi?</h1>
                    <div style="padding-left: 15%; padding-right: 15%" class="table-responsive">
                        <table class="table">
                            <tr>
                                <td>Drag&oslashr</td>
                                <td>T&aringrnby</td>
                                <td>K&oslashbenhavn S</td>
                            </tr>
                            <tr>
                                <td>Frederiksberg</td>
                                <td>Copenhague</td>
                                <td>Hvidovre</td>
                            </tr>
                            <tr>
                                <td>R&oslashdovre</td>
                                <td>Br&oslashndby</td>
                                <td>Vallensb&aelig;k</td>
                            </tr>
                            <tr>
                                <td>Ish&oslashj</td>
                                <td>H&oslashje-Taastrup</td>
                                <td>Albertslund</td>
                            </tr>
                            <tr>
                                <td>Glostrup</td>
                                <td>Gentofte</td>
                                <td>Gladsaxe</td>
                            </tr>
                            <tr>
                                <td>Herlev</td>
                                <td>Ballerup</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <i id="headmapa" class="arrow stik fa fa-angle-double-up fa-5x " data-wow-delay=".1s"></i>
                <i id="headmapa_down" class="arrow stik fa fa-angle-double-down fa-5x " data-wow-delay=".1s"></i>

            </div>
        </div>
        <iframe id="frame" style="width: 100%; height: 700px" src="https://www.google.com/maps/d/embed?mid=zvM1R81DNQW4.klWCktvEXU4k"></iframe>
    </div>
</section>
<section id="Om">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-2 text-right" style="background: rgba(255, 255, 255, 0.7); padding: 25px">
                <h1>
                    <w class="color_b">Bubbles</w>
                    <small style="color: #212121"> Vi passer p&aring dit hjem.</small>
                </h1>
                <p> Bubbles er et rengøringsﬁrma, som sætter en stor ære i at levere en ordentligt rengøring top service
                    for rengøring – vi gør det fra første dag. Vi er hele tiden i løbende kontakt med vores kunder, så
                    du som kunde kan føle dig tryg.
                    Du kan helt uforpligtende indhente et rengøringstilbud online.
                    Her på hjemmesiden, kan du læse hvad der er vigtigt at vide om os.
                    Skulle der dog være yderligere detaljer, som du godt vil have klarhed om, er du selvfølgelig
                    velkommen til at sende os en e-mail på:  <a href="mailto:bubblescopenhagen@gmail.com">bubblescopenhagen@gmail.com </a>og vi svarer indenfor 8 timer (i
                    dagtimerne.)<br>


                </p>
            </div>
        </div>
</section>
<section class="bg-dark" style="padding:70px; background: #41444A">
    <div class="container">
        <div class="row">

            <div class="col-lg-12 text-center wow tada" style="margin-bottom: 25px">
                <h1>Vi ser frem til din henvendelse og håber at se dig som kunde.</h1>
            </div>
            <div class="col-lg-offset-4 col-lg-2  text-center wow tada">
                <i class="fa fa-phone fa-5x wow bounceIn"></i>
                <p>+54 31413620</p>
            </div>
            <div class="col-lg-2 text-center">
                <a href="mailto:bubblescopenhagen@gmail.com" style="color:#ffffff">
                    <i class="fa fa-envelope-o fa-5x wow bounceIn" data-wow-delay=".1s"></i>
                    <p>Bubbles Copenhagen</p>
                </a>
            </div>
        </div>
    </div>
    </div>
</section>
<!-- Modal -->
<div class="modal fade" id="Kontakt" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Bubbles Kontakt</h4>
            </div>
            <div class="modal-body">
                <?php print render($page['footer']); ?>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-primary">Save changes</button>-->
            </div>
        </div>
    </div>
</div>
<!--------------------------------------Findetodo------------------------------------------------------------------- -->
