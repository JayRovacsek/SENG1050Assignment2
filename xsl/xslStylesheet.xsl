<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" />

    <xsl:template match="template">

        <html>
            <head>	
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
                <link  rel="stylesheet" type="text/css" href="../css/style.css" />
                <title>Online Food Deliveries Newcastle</title>

                <script src="../js/myJavaScripts.js" type="text/javascript">
                </script>

            </head>
		    <body>

                <div id = "Navigation">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../datacollection.html">Submit feedback or requests</a></li>
                    </ul>
                </div>

                <xsl:apply-templates select="navigation"/>
                <xsl:apply-templates select="restaurants/restaurant"/>

                <xsl:apply-templates select="other"/>

		    </body>
	   </html>

    </xsl:template>

    <xsl:template match="restaurants/restaurant">

        <div id="OtherElementsContainerXSL">

            <h2>Restaurant: <xsl:value-of select="restaurantName"/></h2>
            <xsl:apply-templates select="about"/>
            <xsl:apply-templates select="menu"/>
            <xsl:apply-templates select="contact"/>
            <xsl:apply-templates select="openHours"/>
            <xsl:apply-templates select="deliveryDetails"/>

            <div id="RestaurantImage">
                <img alt="Restaurant Image" class="hoverable">
                    <xsl:attribute name="src">
                        <xsl:value-of select="about/restaurantPicture"/>			
                    </xsl:attribute>			
                </img>
            </div>
        </div>
    
    </xsl:template>

    <xsl:template match="about">

        <img alt="Logo">
            <xsl:attribute name="src">
                <xsl:value-of select="restaurantLogo"/>			
            </xsl:attribute>			
	    </img>

        <div id="InfoDiv">
            <xsl:value-of select="restaurantDescription"/>
            <p>Price Range:</p>
            <xsl:value-of select="priceRange"/>
        </div>

    </xsl:template>

    <xsl:template match="other">

        <xsl:value-of select="."/>

    </xsl:template>

    <xsl:template match="phoneContact">

        <xsl:value-of select="."/>

    </xsl:template>

    <xsl:template match="menu">

        <div id="InfoDiv">
            <h2>Menu:</h2>
            <xsl:for-each select="item">
                <hr></hr>
                <p>Item:</p>
                <xsl:value-of select="itemName"/>
                <p>Description:</p>
                <xsl:value-of select="itemDescription"/>
                <p>Price:</p>
                <xsl:value-of select="price"/>
                <p>Allergens:</p>
                <xsl:value-of select="allergens"/>
            </xsl:for-each>
        </div>

    </xsl:template>

    <xsl:template match="contact">

        <div id="InfoDiv">
            <h2>Address:</h2>
            <xsl:for-each select="address">
                <p><xsl:value-of select="streetNumber"/>_
                <xsl:value-of select="streetName"/>_
                <xsl:value-of select="streetType"/>, 
                <xsl:value-of select="locality"/>, 
                <xsl:value-of select="postcode"/></p>
            </xsl:for-each>
            <h2>Contact:</h2>
            <xsl:apply-templates select="phoneContact"/>
        </div>

    </xsl:template>

    <xsl:template match="openHours">

        <div id="InfoDiv">
            <h2>Open Hours:</h2>
            <xsl:for-each select="servicePeriod">
                <xsl:value-of select="streetNumber"/>
                <xsl:value-of select="streetName"/>
                <xsl:value-of select="streetType"/>
                <xsl:value-of select="locality"/>
                <xsl:value-of select="postcode"/>
            </xsl:for-each>
        </div>

    </xsl:template>

    <xsl:template match="deliveryDetails">

        <div id="InfoDiv">
            <h2>Delivery Details::</h2>
            <p>Minmum order:</p>
            <xsl:value-of select="minimumPrice"/>
            <p>Delivery charge:</p>
            <xsl:value-of select="deliveryFee"/>
        </div>

    </xsl:template>

</xsl:stylesheet> 