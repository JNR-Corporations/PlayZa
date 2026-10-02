const PLAYZA_INVITE_LINK = "https://your-playza-link.com";


    /*
     * Open Invite Panel
     */

    function openInviteFriend() {

        const modal = document.getElementById("inviteFriendModal");
        const backdrop = document.getElementById("inviteFriendBackdrop");
        const sheet = document.getElementById("inviteFriendSheet");
        const link = document.getElementById("inviteFriendLink");

        if (!modal || !backdrop || !sheet) return;

        if (link) {
            link.textContent = PLAYZA_INVITE_LINK;
        }

        modal.classList.remove("hidden");

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {

            backdrop.classList.remove("opacity-0");

            sheet.classList.remove("translate-y-full");

        });

    }


    /*
     * Close Invite Panel
     */

    function closeInviteFriend() {

        const modal = document.getElementById("inviteFriendModal");
        const backdrop = document.getElementById("inviteFriendBackdrop");
        const sheet = document.getElementById("inviteFriendSheet");

        if (!modal || !backdrop || !sheet) return;

        backdrop.classList.add("opacity-0");

        sheet.classList.add("translate-y-full");

        setTimeout(() => {

            modal.classList.add("hidden");

            document.body.style.overflow = "";

        }, 300);

    }


    /*
     * Copy Invite Link
     */

    async function copyInviteLink() {

        const button = document.getElementById("copyInviteButton");

        try {

            await navigator.clipboard.writeText(PLAYZA_INVITE_LINK);

            if (button) {

                button.innerHTML =
                    '<i class="fa-solid fa-check mr-1"></i> Copied';

                button.classList.add(
                    "text-emerald-600",
                    "border-emerald-200"
                );

                setTimeout(() => {

                    button.innerHTML =
                        '<i class="fa-regular fa-copy mr-1"></i> Copy';

                    button.classList.remove(
                        "text-emerald-600",
                        "border-emerald-200"
                    );

                }, 1800);

            }

        } catch (error) {

            /*
             * Fallback for browsers where Clipboard API
             * is unavailable.
             */

            const temp = document.createElement("textarea");

            temp.value = PLAYZA_INVITE_LINK;

            temp.style.position = "fixed";
            temp.style.opacity = "0";

            document.body.appendChild(temp);

            temp.select();

            try {
                document.execCommand("copy");
            } catch (e) {
                console.warn("Copy failed:", e);
            }

            temp.remove();

        }

    }


    /*
     * Share PlayZa
     */

    async function sharePlayZaInvite() {

        const shareData = {

            title: "Join PlayZa",

            text:
                "I'm using PlayZa for learning. Join me and start your journey!",

            url: PLAYZA_INVITE_LINK

        };


        /*
         * Use device/browser sharing only after
         * the user taps Share Invite.
         */

        if (navigator.share) {

            try {

                await navigator.share(shareData);

            } catch (error) {

                /*
                 * User cancelled the share panel.
                 * Nothing needs to happen.
                 */

                if (error.name !== "AbortError") {

                    console.warn(
                        "Sharing failed:",
                        error
                    );

                }

            }

        } else {

            /*
             * If Web Share isn't supported,
             * copy the link instead.
             */

            await copyInviteLink();

            alert("Invite link copied!");

        }

    }


    /*
     * ESC key support
     */

    document.addEventListener("keydown", function(event) {

        if (
            event.key === "Escape" &&
            !document
                .getElementById("inviteFriendModal")
                ?.classList.contains("hidden")
        ) {

            closeInviteFriend();

        }

    });
