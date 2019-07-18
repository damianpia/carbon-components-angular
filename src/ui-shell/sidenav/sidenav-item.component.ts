import { Component, Input, Sanitizer } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: "ibm-sidenav-item",
	template: `
		<li [ngClass]="{
			'bx--side-nav__item': !isSubMenu,
			'bx--side-nav__menu-item': isSubMenu
		}"
		[attr.role]="(isSubMenu ? 'none' : null)">
			<a
				class="bx--side-nav__link"
				[href]="getHref()"
				[attr.role]="(isSubMenu ? 'menuitem' : null)"
				[attr.aria-current]="(active ? 'page' : null)">
				<div *ngIf="!isSubMenu" class="bx--side-nav__icon">
					<ng-content select="[icon]"></ng-content>
				</div>
				<span class="bx--side-nav__link-text">
					<ng-content></ng-content>
				</span>
			</a>
		</li>
	`
})
export class SideNavItem {
	/**
	 * Link for the item. NOTE: *do not* pass unsafe or untrusted values, this has the potential to open you up to XSS attacks
	 */
	@Input() href = "javascript:void(0)";
	/**
	 * Toggles the active (current page) state for the link.
	 */
	@Input() active = false;
	isSubMenu = false;

	constructor(protected domSanitizer: DomSanitizer) {}

	getHref() {
		return this.domSanitizer.bypassSecurityTrustUrl(this.href);
	}
}
