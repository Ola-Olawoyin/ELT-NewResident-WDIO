import { Given, When, Then } from "@wdio/cucumber-framework";

Given(/^A care manager Logs in to PASS webpage$/, async () => {
  await browser.url("https://qaapp.passgenius.com/logon");
  await browser.maximizeWindow();

  // Login to Care Manager's Home Page
  await $("#exampleInputEmail1").setValue("olaolawoyin167943");
  await $("#exampleInputPassword1").setValue("TechTest321!!");
  await $("#login-btn").click();

  const userPageTitle = await $(".username.ng-binding.ng-scope");
  await expect(userPageTitle).toBeDisplayed();
});

When(
  /^The care manager navigates to the Residents page and click Add to add new resident$/,
  async () => {
    const residentLocator = $("#customersTab");
    residentLocator.waitForClickable();
    residentLocator.click();

    (await $("button[type='button'][aria-hidden='false']")).click();

    browser.pause(10000);

    const mainDetailTitle = await $(".card-title");
    await mainDetailTitle.waitForExist();
    await expect(mainDetailTitle).toHaveText("Main details");
  }
);

When(/^Complete the New resident details sections$/, async () => {
  //Complete Main Details

  const titleDropdown = $("#title");
  titleDropdown.waitForClickable();
  titleDropdown.click();
  await titleDropdown.selectByVisibleText("Mr");

  await $("#firstname").setValue("Malerie");
  await $("#surname").setValue("Adams");
  await $("#nickname").setValue("MAdams");

  const sexDropdown = await $("#sex");
  await sexDropdown.selectByVisibleText("Female");

  const dateOfBirth = await $("#dob");
  dateOfBirth.setValue("01/12/1945");

  await $("#ssNumber").setValue(12345678);

  await $("#admissionWeightInKilograms").setValue(78);

  await $("#admissionHeightInMeters").setValue(1.77);

  const dateOfAdmission = await $("#startDate");
  dateOfAdmission.click();
  dateOfAdmission.setValue("01/01/2024");

  //Contact Details

  await $("#address1").setValue("No 68 Knight Templar Way");
  await $("#address2").setValue("Strood");
  await $("#city").setValue("Rochester");
  await $("#county").setValue("Kent");
  await $("#postcode").setValue("ME3 2LW");
  await $("#country").setValue("United Kingdom");
  await $("#tel").setValue("012234567890");
  await $("#email").setValue("ttester@testing.com");
  await $("#mobile").setValue("075789034567");
  await $("#accessDetails").setValue("Check summary care record");
  await $("#allergies").setValue("Penicillin");

  //Emergency Contact Details
  await $("#nextofkin").setValue("Greg Adams");
  await $("#nextofkintel").setValue("075789034345");

  //Patient Details
  await $("#doctor").setValue("Amit Patel");
  await $("#surgery").setValue("Parkway Medical Practice");
  await $("#surgerytel").setValue("012222333344");

  //Save the details of the newly added resident
  // await $(".btn.btn-success.btn-card.action-save.ng-binding").click();
  const saveButton = await $("button[ng-show='!vm.options.save.hidden']");
  saveButton.waitForClickable();
  saveButton.click();

  const textlocator = await $("a[ui-sref='customer.careplan.outcomes']");

  await expect(textlocator).toBeClickable();
});

Then(/^Makes the new resident active$/, async () => {
  const detailsLocator = $(
    "a[ui-sref='customer.details'][ng-bind='tab.title | officeText: context.careplan']"
  );
  detailsLocator.waitForExist();
  detailsLocator.click();

  await $("#customer-status-update").click();
  const iframe = await browser.$("modal-content");
  await browser.switchToFrame(iframe);
  const newCustomerstatusDropdowm = await $(
    ".form-control.ng-pristine.ng-empty.ng-invalid.ng-invalid-required.ng-touched"
  );

  await newCustomerstatusDropdowm.selectByVisibleText("ACTIVE");
  await $("input[type='text'][fdprocessedid='xywli']").setValue(
    "Resident registration completed"
  );
  await $("button[fdprocessedid='03v0i7']").click();
});

Then(/^The new resident is searchable in the search window$/, async () => {
  await $("#customersTab").click();
  await $("#filterTerm").setValue("Smith");
  await $("div[role='button']").click();
});

Then(/^The residents details are presented in the details page$/, async () => {
  await $("a[ui-sref='customer.details'][class='ng-binding']").click();
});
